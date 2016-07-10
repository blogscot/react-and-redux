import expect from 'expect'
import courseReducer from './courseReducer'
import {ajaxCallError} from '../actions/ajaxStatusActions'
import * as actions from '../actions/courseActions'

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ]
    const course = {title: 'C'}
    const action = actions.createCourseSuccess(course)
    const newState = courseReducer(initialState, action)
    expect(newState.length).toEqual(3)
    expect(newState[0].title).toEqual('A')
    expect(newState[1].title).toEqual('B')
    expect(newState[2].title).toEqual('C')
  })

  it('should update course when passed UPATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'},
      {id: 'C', title: 'C'}
    ]

    const course = {id: 'B', title: 'New Title'}
    const action = actions.updateCourseSuccess(course)

    // act
    const newState = courseReducer(initialState, action)
    const updateCourse = newState.find(a => a.id == course.id)
    const untouchedCourse = newState.find(a => a.id == 'A')

    // assert
    expect(newState.length).toEqual(3)
    expect(updateCourse.title).toEqual('New Title')
    expect(untouchedCourse.title).toEqual('A')
  })

  it('should leave state unchanged on AJAX_CALL_ERROR', () => {
    // arrange
    const state = {title: 'Course Title'}
    const action = ajaxCallError()

    // act
    const newState = courseReducer(state, action)

    // assert
    expect(newState).toEqual(state)
  })
})