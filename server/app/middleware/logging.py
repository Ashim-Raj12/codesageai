import time
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from ..core.logger import logger

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware that intercept HTTP actions, logs path routes, and profiles execution latencies.
    """
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        start_time = time.perf_counter()
        method = request.method
        path = request.url.path
        
        logger.info(f"Incoming Request: {method} {path}")
        
        try:
            response = await call_next(request)
            process_time = (time.perf_counter() - start_time) * 1000
            response.headers["X-Process-Time-Ms"] = f"{process_time:.2f}"
            logger.info(f"Completed Request: {method} {path} - Status: {response.status_code} - Latency: {process_time:.2f}ms")
            return response
        except Exception as e:
            process_time = (time.perf_counter() - start_time) * 1000
            logger.error(f"Failed Request: {method} {path} - Exception: {e} - Time: {process_time:.2f}ms")
            raise
