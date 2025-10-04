import { useState, useEffect } from 'react'

export interface FeedbackMessage {
  id: string
  name: string
  email?: string
  product?: string
  message: string
  rating: number
  date: string
}

export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackMessage[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  console.log('useFeedback hook initialized')

  // Carregar feedbacks do localStorage
  useEffect(() => {
    const loadFeedbacks = () => {
      try {
        const savedFeedbacks = localStorage.getItem('ecofly-feedbacks')
        if (savedFeedbacks) {
          const parsedFeedbacks = JSON.parse(savedFeedbacks)
          console.log('Feedbacks carregados do localStorage:', parsedFeedbacks)
          setFeedbacks(parsedFeedbacks)
        } else {
          console.log('Nenhum feedback encontrado no localStorage')
          setFeedbacks([])
        }
      } catch (error) {
        console.error('Erro ao carregar feedbacks do localStorage:', error)
        localStorage.removeItem('ecofly-feedbacks')
        setFeedbacks([])
      } finally {
        setIsLoaded(true)
      }
    }

    if (!isLoaded) {
      loadFeedbacks()
    }
  }, [isLoaded])

  // Salvar no localStorage sempre que feedbacks mudar
  useEffect(() => {
    if (isLoaded) {
      console.log('Salvando feedbacks no localStorage:', feedbacks)
      localStorage.setItem('ecofly-feedbacks', JSON.stringify(feedbacks))
    }
  }, [feedbacks, isLoaded])

  const addFeedback = (feedback: Omit<FeedbackMessage, 'id' | 'date'>) => {
    console.log('=== ADICIONANDO FEEDBACK ===')
    console.log('Feedback a ser adicionado:', feedback)
    
    const newFeedback: FeedbackMessage = {
      ...feedback,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString('pt-BR')
    }
    
    setFeedbacks(prevFeedbacks => {
      const newFeedbacks = [newFeedback, ...prevFeedbacks] // Adiciona no início para mostrar os mais recentes primeiro
      console.log('Novos feedbacks após adição:', newFeedbacks)
      return newFeedbacks
    })
    
    return newFeedback.id
  }

  const getRecentFeedbacks = (limit: number = 5) => {
    return feedbacks.slice(0, limit)
  }

  const clearAllFeedbacks = () => {
    console.log('=== LIMPANDO TODOS OS FEEDBACKS ===')
    setFeedbacks([])
    localStorage.removeItem('ecofly-feedbacks')
  }

  // Debug logs
  console.log('Hook estado atual:', { 
    feedbacksCount: feedbacks.length,
    isLoaded,
    recentFeedbacks: feedbacks.slice(0, 3).map(f => ({ id: f.id, name: f.name, rating: f.rating }))
  })

  return {
    feedbacks,
    addFeedback,
    getRecentFeedbacks,
    clearAllFeedbacks,
    feedbacksCount: feedbacks.length,
    isLoaded
  }
}