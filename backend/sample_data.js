export const sensor_data = [
  {
    timestamp: '2022-11-23T18:48:00Z',
    environment: {
      temperature: 30.85001,
      pressure: 99.454,
      humidity: 68.347
    },
    spectroscopy: [
      {
        name: 'Spect_V',
        value: 58.5
      },
      {
        name: 'Spect_B',
        value: 10.3
      },
      {
        name: 'Spect_G',
        value: 47.2
      },
      {
        name: 'Spect_Y',
        value: 33
      },
      {
        name: 'Spect_O',
        value: 36.4
      },
      {
        name: 'Spect_R',
        value: 4.4
      }
    ],
    telemetry: {
      AXC: 0.141357,
      AXY: -0.003662,
      AXZ: -8,
      Signal: 'LO'
    }
  },
  {
    timestamp: '2022-11-23T18:49:00Z',
    environment: {
      temperature: 30.870001,
      pressure: 99.443,
      humidity: 68.257
    },
    spectroscopy: [
      {
        name: 'Spect_V',
        value: 57.4
      },
      {
        name: 'Spect_B',
        value: 10.3
      },
      {
        name: 'Spect_G',
        value: 47.2
      },
      {
        name: 'Spect_Y',
        value: 33
      },
      {
        name: 'Spect_O',
        value: 36.4
      },
      {
        name: 'Spect_R',
        value: 4.4
      }
    ],
    telemetry: {
      AXC: 0.022949,
      AXY: -0.101318,
      AXZ: -4.62793,
      Signal: 'LO'
    }
  },
  {
    timestamp: '2022-11-23T18:50:00Z',
    environment: {
      temperature: 31.16,
      pressure: 105.55,
      humidity: 72.949
    },
    spectroscopy: [
      {
        name: 'Spect_V',
        value: 60.8
      },
      {
        name: 'Spect_B',
        value: 11.6
      },
      {
        name: 'Spect_G',
        value: 49.3
      },
      {
        name: 'Spect_Y',
        value: 34.9
      },
      {
        name: 'Spect_O',
        value: 37.3
      },
      {
        name: 'Spect_R',
        value: 5.3
      }
    ],
    telemetry: {
      AXC: 0.050537,
      AXY: -0.013184,
      AXZ: 0.011719,
      Signal: 'MG'
    }
  },
  {
    timestamp: '2022-11-23T18:51:00Z',
    environment: {
      temperature: 31.22,
      pressure: 105.289,
      humidity: 73.797
    },
    // Eslint raise this error: Duplicate key 'spectroscopy'  no-dupe-keys
    // spectroscopy: {
    //   Spect_V: 60.8,
    //   Spect_B: 11.6,
    //   Spect_G: 49.3,
    //   Spect_Y: 34.9,
    //   Spect_O: 37.3,
    //   Spect_R: 5.3
    // },
    spectroscopy: [
      {
        name: 'Spect_V',
        value: 60.8
      },
      {
        name: 'Spect_B',
        value: 11.6
      },
      {
        name: 'Spect_G',
        value: 49.3
      },
      {
        name: 'Spect_Y',
        value: 34.9
      },
      {
        name: 'Spect_O',
        value: 37.3
      },
      {
        name: 'Spect_R',
        value: 5.3
      }
    ],
    telemetry: {
      AXC: 0.04823,
      AXY: -0.012695,
      AXZ: 0.014893,
      Signal: 'MG'
    }
  }
];
