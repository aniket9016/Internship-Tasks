IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [Grades] (
    [GradeId] int NOT NULL IDENTITY,
    [GradeName] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Grades] PRIMARY KEY ([GradeId])
);

CREATE TABLE [Students] (
    [StudentId] int NOT NULL IDENTITY,
    [FirstName] nvarchar(max) NOT NULL,
    [LastName] nvarchar(max) NOT NULL,
    [GradeId] int NOT NULL,
    CONSTRAINT [PK_Students] PRIMARY KEY ([StudentId]),
    CONSTRAINT [FK_Students_Grades_GradeId] FOREIGN KEY ([GradeId]) REFERENCES [Grades] ([GradeId]) ON DELETE CASCADE
);

CREATE INDEX [IX_Students_GradeId] ON [Students] ([GradeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250225121823_InitialDB', N'9.0.2');

COMMIT;
GO

