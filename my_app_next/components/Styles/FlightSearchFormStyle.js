import styled from 'styled-components';

export const FormContainer = styled.div`
  background-color: #d3e1eb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledForm = styled.form`
  /* ... (other styles) */
  input {
    padding: 8px; /* Adjust the padding to your preference */
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%; /* Make all inputs stretch to full width */
    box-sizing: border-box; /* Ensure padding and border are included in width */
    /* Center the text horizontally */
    text-align: center;

  }

  button {
    background-color: #007bff;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: fit-content; /* Make the button width adjust to content */
    margin: 0 auto; /* Center the button horizontally */
  }
`;

export const SearchResultsContainer = styled.div`
margin-top: 20px;

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f5f5f5;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
`;






export const BookResultsContainer = styled.div`
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    font-weight: bold;
    color: #007bff;
  }
`;