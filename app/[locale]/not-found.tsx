
export default async function NotFound() {
    //   const data = await getSiteData(domain)
    return (
        <div className="flex items-center justify-center min-h-screen p-8 gap-4">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
        </div>
    );
}
