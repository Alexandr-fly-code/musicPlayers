import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CreateQuestion from './components/createQuestion/CreateQuestion'
import Question from './components/question/Question'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {drop} from 'data/quiz/actions'

import {deleteQuestion, updateQuestion, hideQuestion, pinQuestion, copyQuestion} from 'data/quiz/questions/actions'

const mapStateToProps = ({quiz}) => ({quiz})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        deleteQuestion,
        hideQuestion,
        pinQuestion,
        copyQuestion,
        drop,
    }, dispatch)
})

const QuizQuestions = ({quiz, setCurrentQuestionId, currentQuestion, actions}) => {

    return (<DragDropContext onDragEnd={actions.drop}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                    >
                        <Fragment>
                            <CreateQuestion quiz={quiz}/>
                            {quiz.questions.map((question, i) => (
                                    <Question
                                        question={question}
                                        key={question.id}
                                        keyNumber={i}
                                        setCurrentQuestionId={setCurrentQuestionId}
                                        currentQuestion={currentQuestion}
                                        actions={actions}
                                        id = {question.id}
                                    />
                                )
                            )}
                        </Fragment>
{provided.placeholder}
</div>
)}
</Droppable>
</DragDropContext>
)
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizQuestions)