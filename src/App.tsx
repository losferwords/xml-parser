import { Layout, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import 'antd/dist/reset.css';
import './App.css';
import EntityList from './components/EntityList/EntityList';
import Title from 'antd/es/typography/Title';

function App() {
  const {
    token: { colorBgContainer, colorPrimaryText },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header className="header">
        <Title className="title" level={2} style={{ color: colorPrimaryText }}>
          A&AI
        </Title>
      </Header>
      <Content className="content">
        <div
          className="content_wrapper"
          style={{ background: colorBgContainer }}
        >
          <EntityList />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
