import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2019-2023',
    title: 'B.M.S College',
    subtitle: 'Chemical Engineering',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2023',
    title: 'BASF India',
    subtitle: 'Student Intern',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2023',
    title: 'Primenumbers',
    subtitle: 'Data Analyst Intern',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2023-Present',
    title: 'Primenumbers',
    subtitle: 'Associate Product Manager',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: 'Future',
    subtitle: 'Building the next big thing',
    position: 'right',
  }
]