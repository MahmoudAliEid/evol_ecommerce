import Header from "@/components/shared/header/header";

const RootLayout = ({ children }: { children: React.ReactNode }) =>
{ 
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 flex-col p-4">
                {children}
            
            </div>
            {/* <Footer /> */}
        </div>
    )
}
export default RootLayout;
