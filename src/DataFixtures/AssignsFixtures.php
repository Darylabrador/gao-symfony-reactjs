<?php

namespace App\DataFixtures;

// use App\Entity\Assigns;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class AssignsFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $faker = Faker\Factory::create('fr_FR');

        // $attribution = new Assigns();
        // $manager->persist($attribution);
        $manager->flush();
    }
}
