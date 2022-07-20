import { FormBuilder } from "@components/FormBuilder";
import { PageBuilderContextProvider } from "@components/PageBuilder/context/builder.context";
import { PageBuilder } from "@components/PageBuilder/PageBuilder.component";
import { NextPage } from "next";

const App: NextPage = () => {
  return (
    <PageBuilderContextProvider>
      <PageBuilder />
    </PageBuilderContextProvider>
  )
}

export default App;
