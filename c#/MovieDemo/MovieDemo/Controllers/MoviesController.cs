using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using MovieDemo.Models;
using MovieDemo.Repositories;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MovieDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;

        public MoviesController(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        [HttpGet]
        public IActionResult GetMovies()
        {
            var movies = _movieRepository.GetAllMovies();
            return movies.Any() ? Ok(movies) : NotFound(new { message = "No movies found" });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovie(int id)
        {
            var movie = await _movieRepository.GetMovieByIdAsync(id);
            return movie != null ? Ok(movie) : NotFound(new { message = "Movie not found" });
        }

        [HttpPost]
        public async Task<IActionResult> AddMovie([FromBody] Movie movie)
        {
            if (movie == null) return BadRequest(new { message = "Invalid movie data" });

            try
            {
                await _movieRepository.AddMovieAsync(movie);
                return StatusCode(201, new { message = "Movie added successfully", movie });
            }
            catch (System.Exception ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, [FromBody] Movie movie)
        {
            if (movie == null || id != movie.MovieId) return BadRequest(new { message = "Invalid data" });

            try
            {
                await _movieRepository.UpdateMovieAsync(movie);
                return Ok(new { message = "Movie updated successfully" });
            }
            catch (System.Exception ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _movieRepository.GetMovieByIdAsync(id);
            if (movie == null) return NotFound(new { message = "Movie not found" });

            await _movieRepository.DeleteMovieAsync(id);
            return Ok(new { message = "Movie deleted successfully" });
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchByTitle([FromQuery] string title)
        {
            var movies = await _movieRepository.FindMoviesByTitleAsync(title);
            return movies.Any() ? Ok(movies) : NotFound(new { message = $"No movies found with title containing '{title}'" });
        }

        // ✅ PATCH method to update specific fields
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMovie(int id, [FromBody] JsonPatchDocument<Movie> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest(new { message = "Invalid patch data" });
            }

            var movie = await _movieRepository.GetMovieByIdAsync(id);
            if (movie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }

            // Apply patch
            patchDoc.ApplyTo(movie, ModelState);

            // Check for errors
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _movieRepository.UpdateMovieAsync(movie);
                return Ok(new { message = "Movie updated successfully", movie });
            }
            catch (System.Exception ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }
    }
}
