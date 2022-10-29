import Notes from './Notes';

export const Home = (props) => {

    return (
        <div> 
            <Notes showMsg={props.showMsg}/>
        </div>
    )
}
