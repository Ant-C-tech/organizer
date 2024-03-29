export const selectStyles = {
  container: (styles) => ({
    ...styles,
    borderRadius: '4px',
  }),
  control: (styles) => ({
    ...styles,
    height: '55px',
    marginBottom: '15px',
    color: '#323e42',
    border: '1px solid #323e42',
    transition: 'box-shadow ease-in-out 0.2s, left ease-in-out 0.2s',
    '&:hover': {
      boxShadow: '0px 0px 0px 0px #718b93',
      cursor: 'pointer',
    },
  }),
  menu: (styles) => ({
    ...styles,
    position: 'relative',
    left: '0px',
    color: 'rgba(50, 62, 66, 0)',
    boxShadow: '12px 15px 10px -5px #718b93',
    transition: 'box-shadow ease-in-out 0.2s, left ease-in-out 0.2s',
    border: '1px solid #323e42',
    '&:hover': {
      boxShadow: '0px 0px 0px 0px #718b93',
      left: '3px',
      color: 'rgba(50, 62, 66, 0.6)',
    },
  }),
  menuList: (styles) => ({
    ...styles,
    margin: '0 10px',
  }),
  option: (styles) => ({
    ...styles,
    paddingBottom: '5px',
    borderRadius: '4px',
    fontWeight: 'bold',
    color: '#323e42',
    textTransform: 'capitalize',
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    padding: '5px 0',
    textTransform: 'capitalize'
  }),
};
