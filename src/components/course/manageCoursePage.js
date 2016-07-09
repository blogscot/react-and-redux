import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as courseActions from '../../actions/courseActions'
import CourseForm from './courseForm'

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      course: Object.assign({}, props.course),
      errors: {}
    }
  }

  render() {
    const {authors} = this.props
    return (
      <div>
        <h1>Manage Course</h1>
        <CourseForm
          allAuthors={authors}
          course={this.state.course}
          errors={this.state.errors}
          onChange={function() {}}
          onSave={function() {}}
          />
      </div>
    )
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' }

  const authorsFormatted = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    }
  })

  return {
    course: course,
    authors: authorsFormatted
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)

