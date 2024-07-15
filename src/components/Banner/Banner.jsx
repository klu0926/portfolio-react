import style from './Banner.module.scss'
const banner = '/images/banner.png'



function Banner() {
  return (
    <>
      <div className={style.bannerContainer}>
        <div className={style.bannerDiv}>
          <img src={banner} className={style.banner} />
        </div>
        <div className={style.title}>LUSART</div>
      </div>
    </>
  )
}

export default Banner
