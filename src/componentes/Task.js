import React from 'react'
import {
  StyleSheet, 
  Text, 
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import Swipeable from 'react-native-swipeable'

import estilos from '../estilos'

export default props => {
  let check = null 

  if(props.doneAt !== null) {
    check = (
      <View style={styles.done}>
        <Icon name='check' 
              size={20} 
              color={estilos.colors.secondary} />
      </View>
    )
  } else {
    check = <View style={styles.pending} />
  }

  const descStyle = props.doneAt !== null ? 
    { textDecorationLine: 'line-through'} : {}

  // Conteúdo do lado esquerod ao utilizar swipe para exluir task
  const leftContent = (
    <View style={styles.exclude}>
      <Icon name='trash' size={20} color='#FFF' />
      <Text style={styles.excludeText}>Excluir</Text>
    </View>
  )

  // Conteúdo do lado direito ao utilizar swipe para exluir task
  const rightContent = [
    <TouchableOpacity 
      style={[styles.exclude, { justifyContent: 'flex-start', paddingLeft: 20 }]}
      onPress={() => props.onDelete(props.id)}>
      <Icon name='trash' size={30} color='#FFF' />
    </TouchableOpacity>
  ]


  return (
    <Swipeable leftActionActivationDistance={200}
      onLeftActionActivate={() => props.onDelete(props.id)}
      leftContent={leftContent} rightButtons={rightContent}>

      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
          <View style={styles.checkContainer}>{ check }</View>
        </TouchableWithoutFeedback>

        <View>
          <Text style={[styles.description, descStyle]}>
            {props.desc}
          </Text>
          <Text style={styles.date}>
            {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')}
          </Text>
        </View>
      </View>

    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
      paddingVertical: 10,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#AAA',
  },
  checkContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
  },
  pending: {
      borderWidth: 1,
      height: 25,
      width: 25,
      borderRadius: 15,
      borderColor: '#555',
  },
  done: {
      height: 25,
      width: 25,
      borderRadius: 15,
      backgroundColor: '#4D7031',
      alignItems: 'center',
      justifyContent: 'center',
  },
  description: {
      fontFamily: estilos.fontFamily,
      color: estilos.colors.mainText,
      fontSize: 15,
  },
  date: {
      fontFamily: estilos.fontFamily,
      color: estilos.colors.subText,
      fontSize: 12,
  },
  exclude: {
      flex: 1,
      backgroundColor: 'red',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
  excludeText: {
      fontFamily: estilos.fontFamily,
      color: '#FFF',
      fontSize: 20,
      margin: 10,
  }
})