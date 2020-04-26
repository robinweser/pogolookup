export default [
  {
    selector: '*',
    style: {
      margin: 0,
      padding: 0,
    },
  },
  {
    selector: '::-webkit-scrollbar',
    style: {
      display: 'none',
    },
  },
  {
    selector: 'html,body,#__next',
    style: {
      minHeight: '100vh',
      maxWidth: '100%',
    },
  },
  {
    selector: '#__next',
    style: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  {
    selector: 'body',
    style: {
      fontFamily: 'sans-serif',
      overscrollBehavior: 'none',
      backgroundColor: 'rgb(240,240,240)',
      overflow: 'auto',
      fontSize: 16,
    },
  },
  {
    selector: 'div',
    style: {
      maxWidth: '100%',
    },
  },
  {
    selector: 'table',
    style: {
      borderCollapse: 'collapse',
      width: '100%',
    },
  },
  {
    selector: 'tbody, thead',
    style: {
      display: 'width',
    },
  },
  {
    selector: 'thead > tr',
    style: {
      fontWeight: 700,
    },
  },
  {
    selector: 'td',
    style: {
      padding: 3,
      whiteSpace: 'nowrap',
      minWidth: 'min-content',
    },
  },
  {
    selector: 'input, select',
    style: {
      fontSize: 16,
      padding: 5,
    },
  },
]
