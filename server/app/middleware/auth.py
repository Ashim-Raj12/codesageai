from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from ..core.security import verify_clerk_token

class AuthStateMiddleware(BaseHTTPMiddleware):
    """
    Middleware that intercept auth headers to pre-validate credentials, 
    populating request state objects dynamically.
    """
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        auth_header = request.headers.get("Authorization")
        request.state.user = None

        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            try:
                payload = await verify_clerk_token(token)
                request.state.user = payload
            except Exception:
                # Let individual controllers raise HTTP 401 exceptions via dependencies
                pass

        return await call_next(request)
