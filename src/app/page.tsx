"use server";
import { Button } from "antd";
import "./index.css";

export default async function HomePage() {
  return (
    <div id="homePage" className="max-width-content">
      <Button type="primary">Primary Button</Button>
    </div>
  );
}
