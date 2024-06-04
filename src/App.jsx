import AllRoutes from "./routes/AllRoutes"
import ProviderComposer from "./context/ProviderComposer";
import {AuthProvider} from "./context/AuthContext"
import {DataProvider} from "./context/DataContext"


function App() {
  const providers = [
    <AuthProvider />,
    <DataProvider/>
  ];

  return (
    <>
    <ProviderComposer  contexts={providers}>
      <AllRoutes/>
      </ProviderComposer>
    </>
  )
}

export default App
