// ============================================================
//  MissionControl.jsx — Aerospace Telemetry Dashboard
//
//  MUI showcase section with:
//  - Tabs (Propulsion / Avionics / Power)
//  - LineChart with live-updating simulated telemetry
//  - DataGrid telemetry log (new rows every 2 s)
//  - Cards with LinearProgress for key system metrics
//  - Dialog for WARNING / ANOMALY row details
//  - Pulsing LIVE indicator
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  ThemeProvider, createTheme,
  Box, Card, CardContent, Typography, LinearProgress,
  Tabs, Tab,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { DataGrid } from '@mui/x-data-grid';
import './MissionControl.css';

// ── MUI dark theme matching portfolio palette ─────────────────
const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#060a0f', paper: '#0d1520' },
    primary:   { main: '#00cfff' },
    secondary: { main: '#7c6dfa' },
    success:   { main: '#1dffa0' },
    warning:   { main: '#f5a623' },
    error:     { main: '#ff4d6d' },
    text:      { primary: '#bdd0e8', secondary: '#4a6278' },
    divider:   '#162030',
  },
  shape: { borderRadius: 4 },
  typography: { fontFamily: "'Outfit', sans-serif" },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { border: '1px solid #162030', backgroundImage: 'none' },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: '#00cfff' },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { backgroundColor: '#162030', borderRadius: 2, height: 4 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { border: '1px solid #162030', backgroundImage: 'none' },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: { border: '1px solid #162030', fontSize: '0.72rem' },
        columnHeader: { backgroundColor: '#060a0f', borderBottom: '1px solid #162030' },
        cell: { borderBottom: '1px solid #0d1520' },
        row: { '&:hover': { backgroundColor: 'rgba(0,207,255,0.04)' } },
      },
    },
  },
});

// ── Per-tab config ─────────────────────────────────────────────
const TAB_CONFIGS = [
  {
    label: 'Propulsion',
    chartLabel: 'Chamber Pressure (bar)',
    baseValue: 82,
    noise: 8,
    metrics: [
      { label: 'Chamber Pressure', value: 82, unit: 'bar',  color: 'primary'   },
      { label: 'Fuel Flow',        value: 67, unit: 'kg/s', color: 'success'   },
      { label: 'Oxidizer Flow',    value: 71, unit: 'kg/s', color: 'secondary' },
      { label: 'Net Thrust',       value: 88, unit: 'kN',   color: 'warning'   },
    ],
  },
  {
    label: 'Avionics',
    chartLabel: 'CPU Load (%)',
    baseValue: 45,
    noise: 14,
    metrics: [
      { label: 'CPU Load',       value: 45,  unit: '%',   color: 'success'   },
      { label: 'Memory Usage',   value: 62,  unit: '%',   color: 'primary'   },
      { label: 'Signal Strength',value: 79,  unit: 'dBm', color: 'secondary' },
      { label: 'GPS Lock',       value: 100, unit: 'sats',color: 'warning'   },
    ],
  },
  {
    label: 'Power',
    chartLabel: 'Battery SoC (%)',
    baseValue: 94,
    noise: 4,
    metrics: [
      { label: 'Battery SoC',  value: 94, unit: '%', color: 'success'   },
      { label: 'Solar Input',  value: 78, unit: 'W', color: 'warning'   },
      { label: 'Load Current', value: 56, unit: 'A', color: 'primary'   },
      { label: 'Bus Voltage',  value: 97, unit: 'V', color: 'secondary' },
    ],
  },
];

function makeData(base, noise) {
  return Array.from({ length: 20 }, () =>
    Math.round(base + (Math.random() - 0.5) * noise)
  );
}

// ── Telemetry log seed data ───────────────────────────────────
const SEED_ROWS = [
  { id: 1,  time: '12:00:01', system: 'PROP',  parameter: 'P_chamber', value: '82.3',  unit: 'bar',  status: 'NOMINAL'  },
  { id: 2,  time: '12:00:03', system: 'AVION', parameter: 'cpu_load',  value: '44.8',  unit: '%',    status: 'NOMINAL'  },
  { id: 3,  time: '12:00:05', system: 'POWER', parameter: 'batt_soc',  value: '94.1',  unit: '%',    status: 'NOMINAL'  },
  { id: 4,  time: '12:00:07', system: 'PROP',  parameter: 'fuel_flow', value: '68.2',  unit: 'kg/s', status: 'WARNING'  },
  { id: 5,  time: '12:00:09', system: 'AVION', parameter: 'mem_usage', value: '63.5',  unit: '%',    status: 'NOMINAL'  },
  { id: 6,  time: '12:00:11', system: 'POWER', parameter: 'solar_in',  value: '75.4',  unit: 'W',    status: 'ANOMALY'  },
  { id: 7,  time: '12:00:13', system: 'GNC',   parameter: 'att_err',   value: '0.03',  unit: 'deg',  status: 'NOMINAL'  },
  { id: 8,  time: '12:00:15', system: 'COMMS', parameter: 'link_qual', value: '97.2',  unit: '%',    status: 'NOMINAL'  },
];

const SYSTEMS = ['PROP', 'AVION', 'POWER', 'GNC', 'COMMS'];
const PARAMS  = ['P_chamber', 'T_exhaust', 'cpu_load', 'batt_soc', 'signal_db', 'fuel_lvl', 'att_err', 'link_qual'];
const UNITS   = ['bar', '%', 'kg/s', 'W', 'deg', 'dBm'];
// Weighted toward NOMINAL so anomalies are notable
const STATUS_POOL = ['NOMINAL','NOMINAL','NOMINAL','NOMINAL','NOMINAL','WARNING','ANOMALY'];

const STATUS_COLOR = { NOMINAL: '#1dffa0', WARNING: '#f5a623', ANOMALY: '#ff4d6d' };

const COLUMNS = [
  { field: 'time',      headerName: 'Time',      width: 82 },
  { field: 'system',    headerName: 'System',    width: 75 },
  { field: 'parameter', headerName: 'Param',     width: 110 },
  { field: 'value',     headerName: 'Value',     width: 72 },
  { field: 'unit',      headerName: 'Unit',      width: 55 },
  {
    field: 'status',
    headerName: 'Status',
    width: 90,
    renderCell: (params) => (
      <span style={{
        color: STATUS_COLOR[params.value] ?? '#bdd0e8',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.6rem',
        letterSpacing: '0.08em',
      }}>
        {params.value}
      </span>
    ),
  },
];

let rowId = SEED_ROWS.length + 1;

// ── Component ─────────────────────────────────────────────────
function MissionControl() {
  const [tabIndex, setTabIndex]     = useState(0);
  const [chartData, setChartData]   = useState(() => makeData(TAB_CONFIGS[0].baseValue, TAB_CONFIGS[0].noise));
  const [rows, setRows]             = useState(SEED_ROWS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const tabIndexRef = useRef(tabIndex);
  useEffect(() => { tabIndexRef.current = tabIndex; }, [tabIndex]);

  // Reset chart when tab changes
  useEffect(() => {
    const cfg = TAB_CONFIGS[tabIndex];
    setChartData(makeData(cfg.baseValue, cfg.noise));
  }, [tabIndex]);

  // Live telemetry tick — every 2 seconds
  useEffect(() => {
    const id = setInterval(() => {
      const cfg = TAB_CONFIGS[tabIndexRef.current];

      // Slide chart window
      setChartData(prev => {
        const next = Math.round(cfg.baseValue + (Math.random() - 0.5) * cfg.noise);
        return [...prev.slice(1), next];
      });

      // Append telemetry row
      const now    = new Date();
      const hh     = String(now.getHours()).padStart(2, '0');
      const mm     = String(now.getMinutes()).padStart(2, '0');
      const ss     = String(now.getSeconds()).padStart(2, '0');
      const newRow = {
        id:        rowId++,
        time:      `${hh}:${mm}:${ss}`,
        system:    SYSTEMS[Math.floor(Math.random() * SYSTEMS.length)],
        parameter: PARAMS[Math.floor(Math.random() * PARAMS.length)],
        value:     (Math.random() * 100).toFixed(2),
        unit:      UNITS[Math.floor(Math.random() * UNITS.length)],
        status:    STATUS_POOL[Math.floor(Math.random() * STATUS_POOL.length)],
      };
      setRows(prev => [newRow, ...prev.slice(0, 19)]);
    }, 2000);

    return () => clearInterval(id);
  }, []); // intentionally run once; tabIndexRef stays current via ref

  function handleRowClick(params) {
    if (params.row.status !== 'NOMINAL') {
      setSelectedRow(params.row);
      setDialogOpen(true);
    }
  }

  const cfg = TAB_CONFIGS[tabIndex];
  const anomalyColor = selectedRow?.status === 'ANOMALY' ? '#ff4d6d' : '#f5a623';

  // Mono font shorthand for sx
  const mono = { fontFamily: "'Space Mono', monospace" };

  return (
    <ThemeProvider theme={muiTheme}>
      <section id="mission-control">
        <p className="s-label">aerospace · mission systems</p>
        <h2 className="s-title">Mission <em>Control</em></h2>

        {/* LIVE indicator */}
        <div className="mc-live-row">
          <span className="mc-live-dot" />
          <span className="mc-live-label">LIVE</span>
          <span className="mc-live-sub">· Simulated Telemetry Feed · 2 s refresh</span>
        </div>

        <Box sx={{ width: '100%' }}>
          {/* Tabs */}
          <Tabs
            value={tabIndex}
            onChange={(_, v) => setTabIndex(v)}
            sx={{
              mb: 3,
              borderBottom: '1px solid #162030',
              '& .MuiTab-root': {
                ...mono,
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#4a6278',
                minHeight: 40,
              },
              '& .Mui-selected': { color: '#00cfff !important' },
            }}
          >
            {TAB_CONFIGS.map((t, i) => <Tab key={i} label={t.label} />)}
          </Tabs>

          {/* Metric cards */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
            gap: 2,
            mb: 3,
          }}>
            {cfg.metrics.map((m, i) => (
              <Card key={i} sx={{ background: '#0d1520' }}>
                <CardContent sx={{ p: '16px !important' }}>
                  <Typography
                    variant="caption"
                    sx={{ ...mono, fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4a6278', display: 'block' }}
                  >
                    {m.label}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, my: 0.75, color: '#bdd0e8', lineHeight: 1 }}>
                    {m.value}
                    <Typography component="span" variant="caption" sx={{ ml: 0.5, color: '#4a6278', fontSize: '0.65rem' }}>
                      {m.unit}
                    </Typography>
                  </Typography>
                  <LinearProgress variant="determinate" value={m.value} color={m.color} />
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Chart + DataGrid row */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
            gap: 2,
            alignItems: 'start',
          }}>
            {/* LineChart */}
            <Card sx={{ background: '#0d1520' }}>
              <CardContent sx={{ p: '14px !important' }}>
                <Typography variant="caption" sx={{ ...mono, fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4a6278', display: 'block', mb: 1 }}>
                  {cfg.chartLabel}
                </Typography>
                <LineChart
                  series={[{
                    data: chartData,
                    color: '#00cfff',
                    area: true,
                    showMark: false,
                    valueFormatter: (v) => `${v}`,
                  }]}
                  xAxis={[{
                    scaleType: 'point',
                    data: chartData.map((_, i) => i),
                    tickLabelStyle: { fill: '#4a6278', fontSize: 10 },
                    tickSize: 0,
                  }]}
                  yAxis={[{
                    tickLabelStyle: { fill: '#4a6278', fontSize: 10 },
                    tickSize: 0,
                  }]}
                  height={230}
                  margin={{ top: 10, right: 12, bottom: 28, left: 44 }}
                  sx={{
                    '& .MuiLineElement-root': { strokeWidth: 2 },
                    '& .MuiAreaElement-root': { fillOpacity: 0.12 },
                    '& .MuiChartsAxis-line': { stroke: '#162030' },
                    '& .MuiChartsAxis-tick': { display: 'none' },
                    '& .MuiChartsGrid-line': { stroke: '#162030', strokeDasharray: '3 3' },
                    '& .MuiChartsLegend-root': { display: 'none' },
                    backgroundColor: 'transparent',
                  }}
                  grid={{ horizontal: true }}
                  slots={{ legend: () => null }}
                />
              </CardContent>
            </Card>

            {/* DataGrid telemetry log */}
            <Card sx={{ background: '#0d1520' }}>
              <CardContent sx={{ p: '14px !important' }}>
                <Typography variant="caption" sx={{ ...mono, fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4a6278', display: 'block', mb: 1 }}>
                  Telemetry Log · tap WARNING / ANOMALY rows
                </Typography>
                <Box sx={{ height: 256 }}>
                  <DataGrid
                    rows={rows}
                    columns={COLUMNS}
                    onRowClick={handleRowClick}
                    density="compact"
                    disableColumnMenu
                    hideFooter
                    sx={{
                      '& .MuiDataGrid-columnHeaderTitle': {
                        ...mono,
                        fontSize: '0.58rem',
                        letterSpacing: '0.08em',
                        color: '#4a6278',
                      },
                      '& .MuiDataGrid-cell': {
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        color: '#bdd0e8',
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Anomaly / Warning Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          PaperProps={{ sx: { background: '#0b1118', minWidth: 340 } }}
        >
          <DialogTitle sx={{
            ...mono,
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: anomalyColor,
            borderBottom: '1px solid #162030',
            pb: 1.5,
          }}>
            ⚠&nbsp;&nbsp;{selectedRow?.status} DETECTED
          </DialogTitle>

          <DialogContent sx={{ pt: 2 }}>
            <Box sx={{ display: 'grid', gap: 1.25, mt: 0.5 }}>
              {[
                ['System',    selectedRow?.system],
                ['Parameter', selectedRow?.parameter],
                ['Value',     `${selectedRow?.value} ${selectedRow?.unit}`],
                ['Timestamp', selectedRow?.time],
                ['Status',    selectedRow?.status],
              ].map(([label, val]) => (
                <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #162030', pb: 1 }}>
                  <Typography variant="caption" sx={{ ...mono, fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4a6278' }}>
                    {label}
                  </Typography>
                  <Typography variant="caption" sx={{ ...mono, fontSize: '0.68rem', color: '#bdd0e8' }}>
                    {val}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ mt: 0.5, p: 1.5, background: '#060a0f', borderRadius: 1, border: '1px solid #162030' }}>
                <Typography variant="caption" sx={{ ...mono, fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a6278', display: 'block', mb: 0.75 }}>
                  Recommended Action
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.72rem', color: '#bdd0e8', lineHeight: 1.6 }}>
                  {selectedRow?.status === 'ANOMALY'
                    ? 'Immediate investigation required. Cross-reference with sensor calibration logs and verify hardware integrity before next telemetry window.'
                    : 'Monitor for trend deviation. Flag for next review cycle if value persists outside the nominal band for more than 3 consecutive readings.'}
                </Typography>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ borderTop: '1px solid #162030', p: 2, gap: 1 }}>
            <Button
              onClick={() => setDialogOpen(false)}
              sx={{ ...mono, fontSize: '0.6rem', letterSpacing: '0.1em', color: '#4a6278', border: '1px solid #162030', '&:hover': { borderColor: '#4a6278', background: 'transparent' } }}
            >
              Dismiss
            </Button>
            <Button
              onClick={() => setDialogOpen(false)}
              variant="contained"
              sx={{ ...mono, fontSize: '0.6rem', letterSpacing: '0.1em', background: '#00cfff', color: '#060a0f', fontWeight: 700, '&:hover': { background: '#bdd0e8' } }}
            >
              Acknowledge
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    </ThemeProvider>
  );
}

export default MissionControl;
