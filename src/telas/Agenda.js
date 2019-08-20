import React, {Component} from 'react'
import {
  StyleSheet, 
  Text, 
  View, 
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'

import todayImage from '../../assets/imgs/today.jpg'
import estilos from '../estilos'

// Componentes
import Task from '../componentes/Task'

export default class Agenda extends Component {
  state = {
    tasks: [
      // { 
      //   id: Math.random(), 
      //   desc: 'Estudar curso de RN', 
      //   estimateAt: new Date(), 
      //   doneAt: new Date() 
      // }
    ],

    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false,
  }

  addTask = task => {
    const tasks = [...this.state.tasks]
    tasks.push({
      id: Math.random(),
      desc: task.desc,
      estimateAt: task.date,
      doneAt: null,
    })

    this.setState({ tasks, showAddTask: false }, this.filterTasks)
  }

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id !== id)
    this.setState({ tasks }, this.filterTasks)
  }

  filterTasks = () => {
    let visibleTasks = null

    if(this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }

    this.setState({ visibleTasks })
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
  }

  componentDidMount = () =>{
    this.filterTasks()
  }
  
  toggleTask = (id) => {
    const tasks = this.state.tasks.map(task =>{
      if (task.id === id) {
        task = {...task}
        task.doneAt = task.doneAt ? null : new Date()
      }
      return task
    })
    this.setState({ tasks }, this.filterTasks)
  }

  render() {
    return (
      <View style={styles.container}>

        <AddTask isVisible={this.state.showAddTask}
          onSave={this.addTask} 
          onCancel={() => this.setState({ showAddTask: false })} />

        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={25} 
                    color={estilos.colors.secondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>
              {moment().locale('pt-br').format('ddd, D [de] MMMM')}
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.taskContainer}>
          <FlatList data={this.state.visibleTasks} 
                    keyExtractor={item => `${item.id}`} 
                    renderItem={({ item }) => 
                      <Task {...item} onToggleTask={this.toggleTask}
                        onDelete={this.deleteTask} /> } />
        </View>

        <ActionButton buttonColor={estilos.colors.today}
          onPress={() => { this.setState({ showAddTask: true}) }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: estilos.fontFamily,
    color: estilos.colors.secondary,
    fontSize: 70,
    marginLeft: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: estilos.fontFamily,
    color: estilos.colors.secondary,
    fontSize: 20, 
    marginLeft: 20,
    marginBottom: 30,
  },
  taskContainer: {
    flex: 7,
  },

  iconBar: {
    marginTop: Platform.OS === 'ios' ? 30 : 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
})