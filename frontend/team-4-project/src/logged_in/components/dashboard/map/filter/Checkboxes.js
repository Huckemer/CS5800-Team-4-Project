import React from 'react';
import * as colors from './Colors'
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

export const TornadoCheckbox = withStyles({
    root: {
      color: colors.TORNADO,
      '&$checked': {
        color: colors.TORNADO,
      },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const HurricaneCheckbox = withStyles({
    root: {
    color: colors.HURRICANE,
    '&$checked': {
        color: colors.HURRICANE,
    },
},
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const SevereStormCheckbox = withStyles({
    root: {
    color: colors.SEVERE_STORMS,
    '&$checked': {
        color: colors.SEVERE_STORMS,
    },
},
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const FireCheckbox = withStyles({
    root: {
    color: colors.FIRE,
    '&$checked': {
        color: colors.FIRE,
    },
},
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const IceStormCheckbox = withStyles({
    root: {
    color: colors.ICE_STORM,
    '&$checked': {
        color: colors.ICE_STORM,
    },
},
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const FloodCheckbox = withStyles({
    root: {
    color: colors.FLOOD,
    '&$checked': {
        color: colors.FLOOD,
    },
},
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const FreezingCheckbox = withStyles({
    root: {
    color: colors.FREEZING,
    '&$checked': {
        color: colors.FREEZING,
    },
},
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


export const EarthquakeCheckbox = withStyles({
    root: {
    color: colors.EARTHQUAKE,
    '&$checked': {
        color: colors.EARTHQUAKE,
    },
},
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const SnowCheckbox = withStyles({
    root: {
    color: colors.SNOW,
    '&$checked': {
        color: colors.SNOW,
    },
},
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const CostalStormCheckbox = withStyles({
    root: {
    color: colors.COSTAL_STORM,
    '&$checked': {
        color: colors.COSTAL_STORM,
    },
},
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const TypoonCheckbox = withStyles({
    root: {
    color: colors.TYPHOON,
    '&$checked': {
        color: colors.TYPHOON,
    },
},
  checked: {},
})((props) => <Checkbox color="default" {...props} />);