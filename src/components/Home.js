import Notes from './Notes';

 const Home = (props) => {

    return (
        <div> 
            <Notes showMsg={props.showMsg}/>
        </div>
    )
}
export default Home;