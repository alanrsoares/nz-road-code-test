import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, {
  View,
  Text,
  StyleSheet
} from 'react-native'

import Question from '../components/Question'
import GameOver from '../components/GameOver'
import Summary from '../components/Summary'
import actions from '../actions'

import { keysLength } from '../lib/utils'

const MainSection = ({ question, position, wrongAnswers, questionsLength, actions }) =>
  (position === questionsLength || wrongAnswers >= 3)
    ? <GameOver />
    : <Question { ...{ ...question, position } }
        onConfirmAnswer={ actions.confirmAnswer }
        onSelectAnswer={ actions.selectAnswer }
      />

const App = ({ questions, progress, actions }) => {
  const { position, wrongAnswers } = progress
  const questionsLength = keysLength(questions)
  const summaryData = { ...progress, questionsLength }
  const question = questions[position]

  return (
    <View style={styles.container}>
      <Summary { ...summaryData } />
      <MainSection { ...{ ...summaryData, question, actions } } />
    </View>
  )
}

export default connect(
  // map state to props
  state => ({ ...state }),
  // map dispatch to props,
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(App)

const styles = StyleSheet.create({
  container: { marginTop: 65, flex: 1 }
})
