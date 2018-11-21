import React from 'react';
import { Grid as GridContainer, Row, Col } from 'react-flexbox-grid';

/**
 * TODO
 * Process alignment props
 */
const Grid = props => {
  const { elements, fluid, lg, md, sm, xs } = props;
  /**
   * This function generates columns that
   * have elements from props
   */

  const cols = elements.map((el, i) => (
    <Col lg={lg} md={md} sm={sm} xs={xs} key={i}>
      {el}
    </Col>
  ));

  // const rows = [];

  /* *
   * This funciton had to generate rows
   * but there was some conflicts with the
   * third-party library 'react-flexbox.grid'
   */

  // cols.reduce((prev, curr, i) => {
  //   i++;
  //   const row = prev.concat(curr);
  //   if (
  //     (row.length % (12 / lg) === 0 || cols.length === i) &&
  //     row.length !== 0
  //   ) {
  //     rows.push(<Row key={i}>{row}</Row>);
  //     return [];
  //   }
  //   return row;
  // }, []);

  return (
    <GridContainer fluid={fluid}>
      <Row>{cols}</Row>
    </GridContainer>
  );
};

export default Grid;
