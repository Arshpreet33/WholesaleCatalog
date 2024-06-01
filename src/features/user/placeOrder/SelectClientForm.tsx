import React, { useEffect } from "react";
import { CircularProgress, Grid, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store.ts";
import MyTextInput from "../../../app/common/form/MyTextInput.tsx";
import { Formik } from "formik";
import * as Yup from "yup";
import { toJS } from "mobx";

const SelectClientForm: React.FC = () => {
  const { clientStore, commonStore } = useStore();
  const { loadingInitial, clients, loadActiveClients, getClientById } =
    clientStore;

  const validationSchema = Yup.object({
    clientId: Yup.string().required("Required"),
  });

  const client = {
    clientId: "",
  };

  const handleStartOrder = (values: typeof client) => {
    if (values?.clientId === "") return;
    const selectedClient = getClientById(values.clientId);
    if (!selectedClient) return;
    const actualClient = toJS(selectedClient);
    console.log("actualClient: ", actualClient);
    if (commonStore) {
      commonStore.setSelectedClient(actualClient);
      commonStore.setOrderMode(true);
    } else {
      console.error("commonStore is undefined");
    }
  };

  useEffect(() => {
    loadActiveClients();
  }, [loadActiveClients]);

  if (loadingInitial) return <CircularProgress />;

  return (
    <>
      <h1>Select Client</h1>
      <Formik
        initialValues={client}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleStartOrder(values);
        }}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <form onSubmit={handleSubmit}>
            <Grid item container spacing={8}>
              <Grid item>
                <MyTextInput
                  name={"clientId"}
                  label={"Clients"}
                  select
                  list={clients}
                  defaultValue={""}
                  fullWidth
                />
              </Grid>

              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  Start Order
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

// const SelectClientForm: React.FC = () => {
//   const { clientStore } = useStore();
//   const { loadingInitial, clients, loadActiveClients } = clientStore;
//   const [clientId, setClientId] = useState<string>("");

//   const handleClientChange = (event: SelectChangeEvent<string>) => {
//     setClientId(event.target.value as string);
//     loadFilteredProducts();
//   };

//   useEffect(() => {
//     loadActiveClients();
//   }, [loadActiveClients]);

//   if (loadingInitial) return <CircularProgress />;

//   return (
//     <div>
//       <FormControl>
//         <InputLabel id="demo-simple-select-label">Clients</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={clientId}
//           onChange={handleClientChange}
//           className="manufacturer-select"
//           label="Category"
//           style={{ width: "200px" }}
//         >
//           <MenuItem value="">
//             <em>All</em>
//           </MenuItem>
//           {clients?.map((client) => (
//             <MenuItem key={client.id} value={client.id}>
//               {client.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

export default observer(SelectClientForm);
