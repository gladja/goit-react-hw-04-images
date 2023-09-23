import { toast } from 'react-toastify';
import { Head, Form, Button, Label, Input } from './Searchbar.styled';
import { useState } from 'react';


export const Searchbar = ({ search, setSearch, handleFormSubmit }) => {

  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (query === '') {
      return toast.warn('Sorry, type search query. Please try again.');
    }

    // if(query === search) {
    //   console.log('query', query);
    //   console.log('search', search);
    //   setSearch('');
    // }

    setSearch(query);
    setQuery('');
    handleFormSubmit();
  };

  const handleSearchChange = e => {
    const search = e.currentTarget.value.trim().toLowerCase();
    setQuery(search);
  };

  return (
    <>
      <Head>
        <Form onSubmit={handleSubmit}>
          <Button type='submit' className='button'>
            <Label>Search</Label>
          </Button>

          <Input
            onChange={handleSearchChange}
            value={query}
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
          />
        </Form>
      </Head>
    </>
  );
};
