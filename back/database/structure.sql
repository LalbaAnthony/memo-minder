DROP TABLE IF EXISTS music;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS time_span
DROP TABLE IF EXISTS user;

#------------------------------------------------------------
# Table: mood
#------------------------------------------------------------
CREATE TABLE mood(
        mood_id INT AUTO_INCREMENT NOT NULL UNIQUE,
        name VARCHAR (50) NOT NULL,
        color VARCHAR (7) NOT NULL UNIQUE DEFAULT '#000000',
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT mood_PK PRIMARY KEY (mood_id)
) ENGINE = InnoDB;

#------------------------------------------------------------
# Table: music
#------------------------------------------------------------
CREATE TABLE music(
        music_id INT AUTO_INCREMENT NOT NULL UNIQUE,
        title VARCHAR (50) NOT NULL,
        artist VARCHAR (50),
        spotify_link VARCHAR (100),
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT music_PK PRIMARY KEY (music_id)
) ENGINE = InnoDB;

#------------------------------------------------------------
# Table: event
#------------------------------------------------------------
CREATE TABLE event(
        event_id INT AUTO_INCREMENT NOT NULL UNIQUE,
        music_id INT,
        user_id INT NOT NULL,
        title VARCHAR (50) NOT NULL,
        description VARCHAR (1000),
        date DATE NOT NULL,
        location VARCHAR (100),
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT event_PK PRIMARY KEY (event_id),
        CONSTRAINT event_user_FK FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
        CONSTRAINT event_music_FK FOREIGN KEY (music_id) REFERENCES music(music_id)
) ENGINE = InnoDB;

#------------------------------------------------------------
# Table: time_span
#------------------------------------------------------------
CREATE TABLE time_span(
        time_span_id INT AUTO_INCREMENT NOT NULL UNIQUE,
        user_id INT NOT NULL,
        music_id INT,
        mood_id INT,
        title VARCHAR (50) NOT NULL,
        description VARCHAR (1000),
        date_start DATE NOT NULL,
        date_end DATE,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT time_span_PK PRIMARY KEY (time_span_id),
        CONSTRAINT time_span_user_FK FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
        CONSTRAINT time_span_music_FK FOREIGN KEY (music_id) REFERENCES music(music_id),
        CONSTRAINT time_span_mood_FK FOREIGN KEY (mood_id) REFERENCES mood(mood_id)
) ENGINE = InnoDB;

#------------------------------------------------------------
# Table: user
#------------------------------------------------------------
CREATE TABLE user(
        user_id INT AUTO_INCREMENT NOT NULL UNIQUE,
        pseudo VARCHAR (50) NOT NULL,
        email VARCHAR (50) NOT NULL UNIQUE,
        connection_token VARCHAR (500),
        validate_email_token VARCHAR (500),
        reset_password_code INT (6),
        has_validated_email BOOLEAN NOT NULL DEFAULT 0,
        language VARCHAR (5) NOT NULL DEFAULT 'en',
        password VARCHAR (150) NOT NULL,
        last_login DATETIME,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT NOW(),
        CONSTRAINT customer_PK PRIMARY KEY (customer_id)
) ENGINE = InnoDB;