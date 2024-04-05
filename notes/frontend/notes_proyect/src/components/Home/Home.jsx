import './Home.css'
import { Link } from 'react-router-dom'

export const Home = () => {

    return (
        <>
            <div data-aos="fade-right" data-aos-duration="2000">
                <h1 className='titleHome'>It's nice to have you here! :)</h1>
            </div>
            <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="2000">
                <h1 className='titleHome secondary'>What's next?</h1>
            </div>
            <div className='options d-flex justify-content-around'>
                <Link style={{ textDecoration: 'none' }} to='/create'><div className='creationDiv d-flex justify-content-center align-items-center' data-aos-duration="2000" data-aos-delay="2000" data-aos="flip-up" >
                    <h2 className='subtitleHome'>I want to create a note!</h2>
                </div></Link>
                <Link style={{ textDecoration: 'none' }} to='/notes'><div className='creationDiv d-flex justify-content-center align-items-center' data-aos-duration="2000" data-aos-delay="2500" data-aos="flip-up" >
                    <h2 className='subtitleHome'>Let me see my actual notes!</h2>
                </div></Link>
                <Link style={{ textDecoration: 'none' }} to='/archived'><div className='creationDiv d-flex justify-content-center align-items-center' data-aos-duration="2000" data-aos-delay="3000" data-aos="flip-up" >
                    <h2 className='subtitleHome'>Archived notes</h2>
                </div></Link>
            </div>
        </>
    )
}