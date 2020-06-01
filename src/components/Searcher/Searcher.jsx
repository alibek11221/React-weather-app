import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getSuggestions} from "../../api/kladr";

const Searcher = ({setCityName, handleSubmit}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const singnal = axios.CancelToken.source();
    useEffect(() => {
        if (open && query.length) {
            setLoading(true);
            (async () => {
                try {
                    setData(await getSuggestions(query, singnal));
                    setLoading(false);
                } catch (e) {
                }
            })();
        }
        return () => {
            singnal.cancel('');
            setLoading(false);
        }
    }, [query, open])

    useEffect(() => {
        if (!open || !query.length) {
            setData([]);
        }
    }, [open, query]);

    return <form onSubmit={event => handleSubmit(event)}>
        <Autocomplete
            autoComplete={false}
            freeSolo={true}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            options={data}
            loading={loading}
            fullWidth={true}
            onChange={(event, newValue) => {
                setCityName(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Город"
                    variant="outlined"
                    onChange={event => setQuery(event.target.value)}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <IconButton type="submit">
                                <SearchIcon/>
                            </IconButton>
                        ),
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}/>
            )}
        />
    </form>
};

export default Searcher;