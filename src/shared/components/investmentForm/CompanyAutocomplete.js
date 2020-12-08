import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getCompaniesQuery } from "shared/queries/companyQueries";

const CompanyAutocomplete = ({ selectedCompany, setSelectedCompany }) => {
  const [open, setOpen] = React.useState(false);
  const [autocompleteText, setAutocompleteText] = useState("");
  const { loading, data } = useQuery(getCompaniesQuery, {
    variables: { searchQuery: `${autocompleteText}%`, limit: 10 },
  });

  const handleChange = (e, value) => {
    setAutocompleteText(value);
  };

  const handleValueChange = (e, value) => {
    setSelectedCompany({
      id: value.id,
      name: value.name,
    });
  };

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={handleChange}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={data?.company || []}
      loading={loading}
      onChange={handleValueChange}
      defaultValue={selectedCompany}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select Company"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default CompanyAutocomplete;
