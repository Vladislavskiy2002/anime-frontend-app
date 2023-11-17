// import logo from './logo.svg';
import './App.css';
import FirstComponent from './components/FirstComponent';
import TodoApp from './components/Todo/TodoApp';
// import FirstComponent from './components/FirstComponent'
// import SecondComponent from './components/SecondComponent'
// import ThirdComponent from './components/ThirdComponent'
// import Counter from './components/Counter/Counter'
// import TodoApp from './components/Todo/TodoApp';
function App() {
  const backgroundImageUrl = `https://fonoteka.top/uploads/posts/2022-02/1643983348_40-phonoteka-org-p-anime-fon-dlya-saita-42.jpg`;
  // const backgroundImageUrl = `https://fonoteka.top/uploads/posts/2022-02/1643983331_67-phonoteka-org-p-anime-fon-dlya-saita-70.jpg`;
  // const backgroundImageUrl = `https://fonoteka.top/uploads/posts/2022-02/1643983349_50-phonoteka-org-p-anime-fon-dlya-saita-52.jpg`;
  // const backgroundImageUrl = `https://fonoteka.top/uploads/posts/2022-02/1643983409_49-phonoteka-org-p-anime-fon-dlya-saita-51.jpg`;

  
  // const divStyle = {
  //   backgroundImage: `url(${backgroundImageUrl})`,
  //   backgroundSize: 'cover', // You can adjust this property based on your needs
  //   width: '100%',            // Set width to fill the container
  //   height: '100vh',          // Set height to fill the viewport
  // };

  // const divStyle = {
  //   backgroundImage: `url(${backgroundImageUrl})`,
  //   backgroundSize: 'cover',
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100vh',
  //   zIndex: -1, // Це забезпечить, що фон буде знаходитися позаду вашого іншого контенту
  // };

  // const divStyle = {
  //   position: 'relative',
  //   minHeight: '100vh',
  //   overflowY: 'auto',
  //   backgroundImage: `url(${backgroundImageUrl})`,
  //   backgroundSize: 'cover',
  // };

  const divStyle = {
    position: 'relative',
    minHeight: '100vh',
    overflowY: 'auto',
  };

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    zIndex: -1,
  };
  return (
    // <FirstComponent/>
    <div className="TodoApp" style= {divStyle}>
      <div style={backgroundStyle}></div>
    <TodoApp/>
    </div>
  );
}

export default App;
