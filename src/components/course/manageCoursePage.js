import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'

import toastr from 'toastr'

import * as courseActions from '../../actions/courseActions'
import CourseForm from './courseForm'
import {authorsFormattedForDropdown} from '../../selectors/selectors'

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)})
    }
  }

  onChange(event) {
    const field = event.target.name
    let course = this.state.course
    course[field] = event.target.value
    return this.setState({course: course})
  }

  courseFormIsValid() {
    let formIsValid = true
    let errors = {}
    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.'
      formIsValid = false
      this.setState({errors: errors})
    }
    return formIsValid
  }

  onSave(event) {
    event.preventDefault()
    if (!this.courseFormIsValid()) {
      return
    }
    this.setState({saving: true})
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect('Course saved'), (error) => {
        toastr.error(error)
        this.setState({saving: false})
      })
  }

  redirect(msg) {
    this.setState({saving: false})
    toastr.success(msg)
    this.context.router.push('/courses')
  }

  render() {
    const {authors} = this.props
    return (
      <div>
        <CourseForm
          allAuthors={authors}
          course={this.state.course}
          errors={this.state.errors}
          onChange={this.onChange}
          onSave={this.onSave}
          saving={this.state.saving}
          />
      </div>
    )
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

// Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
}

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id)
  return course.length ? course[0] : null
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' }

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId)
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)

