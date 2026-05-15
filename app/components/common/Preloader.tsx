'use client'

import React from 'react'
import { Memory } from '../models/Memory'
import { Wanderer } from '../models/Wanderer'
import WindowModel from '../models/WindowModel'

// List of models to preload.
const MODELS = [WindowModel, Memory, Wanderer];

const Preloader = () => {
  return (<>
    {MODELS.map((Component, index) => (
      <Component key={index} visible={false} />
    ))}
  </>)
}

export default Preloader;
