import React from 'react';
import { Card, CardBody, CardBlock, CardDeck, CardText } from 'reactstrap';

export default function Sidebar() {
  return (
    <aside className="col-sm-12 col-md-4">
      <Card>
        <CardDeck>
          <CardText>
            Sidebar Item
          </CardText>
        </CardDeck>
      </Card>
    </aside>
  );
}