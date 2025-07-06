import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const ProductManagementSimple = () => {
  const [activeTab, setActiveTab] = useState("add");

  console.log("ProductManagementSimple component rendering...");

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3>Simple Product Management Test</h3>
      <p>This is a test component to isolate the issue.</p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="add">Add Product</TabsTrigger>
          <TabsTrigger value="manage">Manage Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="space-y-6">
          <div>
            <h4>Add Product Tab</h4>
            <p>This tab should work fine.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="manage">
          <div>
            <h4>Manage Products Tab</h4>
            <p>This tab should also work fine.</p>
            <Button>Test Button</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductManagementSimple; 