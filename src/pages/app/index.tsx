import { FormBuilder } from "@components/FormBuilder";
import { PageBuilder } from "@components/PageBuilder";
import { PageBuilderContextProvider } from "@components/PageBuilder/context";
import { NextPage } from "next";

const App: NextPage = () => {
  const restoreTemplate = [
   
  ]
  return (
    <PageBuilderContextProvider template={restoreTemplate}>
      <PageBuilder />
    </PageBuilderContextProvider>
  )
}

export default App;
