import { useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

type HttpMethod = 'get' | 'post'

interface UseAxiosResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
  fetchData: (url: string, options?: AxiosRequestConfig) => Promise<void>
}

export function useAxios<T = unknown>(
  method: HttpMethod = 'get'
): UseAxiosResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async (url: string, options?: AxiosRequestConfig) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.request<T>({
        method,
        url,
        ...options,
      })

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

  return { data, error, loading, fetchData }
}
