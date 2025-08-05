import { useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

type UsePostResponse<T> = {
  data: T | null
  error: string | null
  loading: boolean
  postData: (url: string, body?: unknown, options?: AxiosRequestConfig) => Promise<void>
}

export const useAxiosPost = <T = unknown>(): UsePostResponse<T> => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const postData = async (url: string, body?: unknown, options?: AxiosRequestConfig) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post<T>(url, body, options)
      setData(response.data)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Something went wrong')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, postData }
}
