/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';

import Agenda from './src/telas/Agenda'

AppRegistry.registerComponent(appName, () => Agenda);

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);