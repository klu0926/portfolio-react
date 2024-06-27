function useTestFetch(mode = 'ok') {
  if (mode === 'ok') {
    return {
      data: [
        {
          title: 'post 1',
          description: 'bla bla bla...',
        },
        {
          title: 'post 2',
          description: 'bla bla bla...',
        },
      ],
      isLoading: false,
      error: null,
      mutate: () => {},
    }
  }

  if (mode === 'loading') {
    return {
      data: null,
      isLoading: true,
      error: null,
      mutate: () => {},
    }
  }

  if (mode === 'error') {
    return {
      data: null,
      isLoading: false,
      error: {
        message: 'testing fetch set to error mode',
      },
      mutate: () => {},
    }
  }
}
export default useTestFetch
