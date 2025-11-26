'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

function StateProvider({children}) {
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default StateProvider
