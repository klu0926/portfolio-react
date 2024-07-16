import style from './groupSelector.module.scss'

// router
import { useSearchParams } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux'

const GroupSelector = () => {
  const posts = useSelector((state) => state.posts.data.data)
  let [searchParams, setSearchParams] = useSearchParams()
  let currentGroup = searchParams.get('group')

  const clickHandler = (group) => {
    setSearchParams({ group })
  }

  let content = null
  if (posts) {
    const groups = new Set()
    posts.forEach((post) => {
      groups.add(post.group)
    })

    content = (
      <div className={style.selectorDiv}>
        <div className={style.selector}>
          <div
            className={`${style.selectorItem} ${
              currentGroup === 'all' || currentGroup === null
                ? style.current
                : ''
            }`}
            onClick={() => {
              clickHandler('all')
            }}
          >
            All
          </div>
          {[...groups].map((group) => {
            const isCurrent = group === currentGroup
            return (
              <div
                onClick={() => {
                  clickHandler(group)
                }}
                key={group}
                className={`${style.selectorItem} ${
                  isCurrent ? style.current : ''
                }`}
              >
                {group.toUpperCase()}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return <>{content}</>
}

export default GroupSelector
