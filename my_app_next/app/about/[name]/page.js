import React, { Suspense } from 'react';
// import {Link, useNavigate, useParams } from 'react-router-dom';

// import { useTranslation } from 'react-i18next';

export async function generateStaticParams() {
    // const posts = await fetch('https://.../posts').then((res) => res.json())
  
    const posts = [];
    posts.push({name:"Ayrus"});
    posts.push({name:"Surya"});
    // posts = {{name:"Ayrus"},{name:"Surya"}};

    console.log("Yeah");
   
    return posts.map((post) => ({
      name: post.name,
    }))
  }

const About = ({params}) => {
    // const {t} = useTranslation();

    // const {name} = useParams();
    // const navigate = useNavigate();
    // const name = "Ayrus";
 
    // console.log({name});

    // useEffect(() => {
      
    //     if (name !== 'Ayrus') {
    //       navigate('/');
    //     }
    //   }, [name, navigate]);

  
    return (
    <>    
      <Suspense fallback={<p>Loading Feed</p>}>
        <h1 style={{color:"green"}}> {(`Hi I am ${params.name}`)}</h1> {/*Here Transalation is to be added*/}
        {/* <Link to='/feedback'>FeeedBackForm</Link> */}
        {/* <AboutTemp/>'9lol */}
      </Suspense>
    </>
    )
};


export default About;