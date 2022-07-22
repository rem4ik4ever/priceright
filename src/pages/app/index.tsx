import { FormBuilder } from "@components/FormBuilder";
import { PageBuilder } from "@components/PageBuilder";
import { PageBuilderContextProvider } from "@components/PageBuilder/context";
import { NextPage } from "next";

const App: NextPage = () => {
  return (
    <PageBuilderContextProvider>
      <PageBuilder />
    </PageBuilderContextProvider>
  )
}

export default App;
