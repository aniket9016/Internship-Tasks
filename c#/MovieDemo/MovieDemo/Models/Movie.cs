using System.ComponentModel.DataAnnotations;

namespace MovieDemo.Models
{
    public class Movie
    {
        [Key]
        public int MovieId { get; set; }
        public string MovieName { get; set; }
        public string MovieTitle { get; set; }
        public string Generes { get; set; }
        public string DirectorName { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? ReleaseDate { get; set; }
    }
}
