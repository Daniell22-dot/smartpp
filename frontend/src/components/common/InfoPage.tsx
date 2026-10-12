import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import './InfoPage.css';

interface InfoPageProps {
  title: string;
  subtitle?: string;
  path: string;
  children: ReactNode;
}

export default function InfoPage({ title, subtitle, path, children }: InfoPageProps) {
  return (
    <>
      <SEO
        title={title}
        description={subtitle || `${title} - GM Business Solutions, your trusted online store in Kenya.`}
        path={path}
        type="website"
      />
      <div className="info-page">
        <div className="container">
          <div className="info-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span className="current">{title}</span>
          </div>
          <div className="info-hero">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="info-content">{children}</div>
        </div>
      </div>
    </>
  );
}
