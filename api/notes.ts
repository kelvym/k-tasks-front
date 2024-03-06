import { NoteSchema } from '@/schemas/notes-schema'
import { z } from 'zod'

const createOptions = ({
  auth,
  method,
  body,
}: {
  auth: string | null
  method?: RequestInit['method']
  body?: Record<string, string>
}) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth}`,
  },
  method: method ? method : 'GET',
  ...(body && { body: JSON.stringify(body) }),
})

export const getAll = async ({ auth }: { auth: Promise<string | null> }) => {
  const response = await fetch(
    'http://localhost:4000/v1/notes',
    createOptions({ auth: await auth })
  )

  if (!response.ok) {
    throw new Error('Network response error')
  }

  const json = await response.json()
  return z.array(NoteSchema).parse(json)
}

export const getNote = async ({
  id,
  auth,
}: {
  id: string
  auth: Promise<string | null>
}) => {
  const response = await fetch(
    'http://localhost:4000/v1/notes/' + id,
    createOptions({ auth: await auth })
  )

  if (!response.ok) {
    throw new Error('Network response error')
  }

  const json = await response.json()

  return NoteSchema.parse(json)
}

export const updateNote = async ({
  id,
  text,
  auth,
}: {
  id: string
  text: string
  auth: Promise<string | null>
}) => {
  const response = await fetch(
    'http://localhost:4000/v1/notes/' + id + '/text',
    createOptions({ auth: await auth, method: 'PUT', body: { text } })
  )

  if (!response.ok) {
    throw new Error('Network response error')
  }

  const json = await response.json()

  return json
}

export const updateTitle = async ({
  id,
  title,
  auth,
}: {
  id: string
  title: string
  auth: Promise<string | null>
}) => {
  const response = await fetch(
    'http://localhost:4000/v1/notes/' + id + '/title',
    createOptions({ auth: await auth, method: 'PUT', body: { title } })
  )

  if (!response.ok) {
    throw new Error('Network response error')
  }

  const json = await response.json()

  return json
}