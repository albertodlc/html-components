
export function getBaseUrl(){
    const { origin, pathname } = window.location;
    // Split the pathname into segments and remove the last one
    const pathSegments = pathname.split('/');
    // Remove the last segment and join back
    const basePath = pathSegments.slice(0, -1).join('/');
    
    return origin + basePath + '/'; // Add a trailing slash
}